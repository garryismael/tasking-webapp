"use client";

import { NextUIProvider } from "@nextui-org/react";
import React from "react";

type Prop = {
  children: React.ReactNode;
};

export default function NextUIWrapper(props: Prop) {
  return <NextUIProvider>{props.children}</NextUIProvider>;
}
