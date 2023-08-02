function generateUUID() {
  const timestamp = new Date().getTime().toString(16);
  const randomChars = "0123456789abcdef";
  let randomPart = "";

  for (let i = 0; i < 8; i++) {
    randomPart += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }

  const uuid = `${timestamp}-${randomPart}`;

  return uuid;
}

const uuid = generateUUID();

const storeKey = "zkevm-warm-up-uuid";

const uidStore = Storage.get(storeKey);

if (!uidStore) {
  Storage.set(storeKey, uuid);
}

return <div />;
