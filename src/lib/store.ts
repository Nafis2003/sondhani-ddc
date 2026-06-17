// Volatile in-memory store for the database encryption key
// This key is intentionally NEVER saved to localStorage or cookies.
// It will be wiped upon page reload or tab closure.

let databaseEncryptionKey: CryptoKey | null = null;

export function setEncryptionKey(key: CryptoKey | null) {
  databaseEncryptionKey = key;
}

export function getEncryptionKey(): CryptoKey | null {
  return databaseEncryptionKey;
}

export function clearEncryptionKey() {
  databaseEncryptionKey = null;
}
