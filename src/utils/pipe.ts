//pipe함수
// pipe(filter1,filter2)(result.dataArray)
export const pipe = <T>(...fns: Array<(arg: T) => T>): ((arg: T) => T) => {
  return (arg: T) => {
    return fns.reduce((args, fn) => fn(args), arg);
  };
};
