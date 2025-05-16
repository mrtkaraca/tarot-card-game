export const workletClamp = (val:number, min:number, max:number)=>{
    'worklet';
    return Math.min(Math.max(val, min), max)
}