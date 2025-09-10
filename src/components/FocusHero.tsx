"use client";

import React from "react";
import { useFocusContext } from "@/context/FocusContext";
import Hero from "@/components/Hero";
import CRMHero from "@/components/crm/CRMHero";

export default function FocusHero() {
  const { focus } = useFocusContext();
  if (focus === "crm") return <CRMHero />;
  return <Hero />;
}


