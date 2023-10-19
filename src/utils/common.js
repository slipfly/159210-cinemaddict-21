function generateRandomDate() {
  const from = new Date(1950, 0, 1);
  const to = new Date();
  return new Date(
    from.getTime() +
    Math.random() * (to.getTime() - from.getTime()),
  );
}

export { generateRandomDate };
