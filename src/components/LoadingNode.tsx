import React from "react";

interface ILoadingNode {
  isPending?: boolean;
  skeletonSlot: React.ReactNode;
  nodeSlot: React.ReactNode;
}

const LoadingNode = ({ isPending, nodeSlot, skeletonSlot }: ILoadingNode) => {
  if (isPending) return skeletonSlot;
  else return nodeSlot;
};

export default LoadingNode;
