// Utility for client-side cryptographic operations
// Uses Web Crypto API (SubtleCrypto)

const SALT = "sondhani_secure_salt_2026"; // Hardcoded salt for PBKDF2. In a multi-user high-security system, this would be a per-user salt.

/**
 * Derives an AES-GCM encryption key from a string password using PBKDF2.
 */
export async function deriveKey(password: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode(SALT),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts a plaintext string (e.g. JSON.stringify data) into a base64 encoded string
 * containing the IV and the ciphertext.
 */
export async function encryptData(plaintext: string, key: CryptoKey): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedPlaintext = new TextEncoder().encode(plaintext);

  const ciphertextBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encodedPlaintext
  );

  // Combine IV and ciphertext
  const combined = new Uint8Array(iv.length + ciphertextBuffer.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertextBuffer), iv.length);

  // Convert to base64 for easy storage in IndexedDB (as a string)
  // btoa expects a string, so we convert the Uint8Array to a binary string
  let binary = '';
  const len = combined.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(combined[i]);
  }
  return btoa(binary);
}

/**
 * Decrypts a base64 encoded string containing the IV and ciphertext back into plaintext.
 */
export async function decryptData(encryptedBase64: string, key: CryptoKey): Promise<string> {
  // Convert base64 back to Uint8Array
  const binary = atob(encryptedBase64);
  const combined = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    combined[i] = binary.charCodeAt(i);
  }

  // Extract IV and ciphertext
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);

  const plaintextBuffer = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    ciphertext
  );

  return new TextDecoder().decode(plaintextBuffer);
}

export async function createVerificationData(key: CryptoKey): Promise<string> {
  return await encryptData("AUTH_VALID", key);
}

export async function verifyKey(key: CryptoKey, verificationData: string): Promise<boolean> {
  try {
    const dec = await decryptData(verificationData, key);
    return dec === "AUTH_VALID";
  } catch {
    return false;
  }
}
