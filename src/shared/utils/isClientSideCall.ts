const isClientSideCall = () => !!globalThis.window;

export default isClientSideCall;
