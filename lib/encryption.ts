import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secret = process.env.ENCRYPTION_SECRET!; // 32 chars

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secret),
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(text),
    cipher.final(),
  ]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string) {
  const parts = text.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encryptedText = Buffer.from(parts[1], "hex");

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secret),
    iv
  );

  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString();
}