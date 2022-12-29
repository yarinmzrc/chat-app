export const arrayEquality = (a: any[], b: any[]) => {
  a.sort();
  b.sort();

  if (a.length !== b.length) return false;
  let bool = true;

  a.forEach((element, index) => {
    if (element !== b[index]) {
      bool = false;
    }
  });

  return bool;
};
