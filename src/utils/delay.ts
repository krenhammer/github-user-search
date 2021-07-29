
export const delay = (time: number) => (new Promise((res) => setTimeout(() => res(true), time)));

export default delay;
