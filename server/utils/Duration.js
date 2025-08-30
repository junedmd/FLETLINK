

 const getDuration = (from, to) => {
  return Math.abs(parseInt(to) - parseInt(from)) % 24;
};
export default getDuration;