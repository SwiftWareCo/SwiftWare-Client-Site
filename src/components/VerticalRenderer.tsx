"use client";
import React from "react";
import { useFocusContext } from "@/context/FocusContext";
import { getContentForFocusClient } from "@/lib/focusContent";
import CapabilitiesSection from "@/components/crm/sections/CapabilitiesSection";
import ServiceJourney from "@/components/crm/sections/ServiceJourney";
import OutcomeSnapshots from "@/components/crm/sections/OutcomeSnapshots";
import FitFirstBullets from "@/components/crm/sections/FitFirstBullets";

export default function VerticalRenderer() {
  const { focus } = useFocusContext();
  const data = getContentForFocusClient(focus);
  if (!data) return null;

  return (
    <div className="vertical-renderer">
      <FitFirstBullets items={data.bullets} />
      {focus === "crm" && <CapabilitiesSection tiles={data.capabilities} />}
      {focus === "crm" && <ServiceJourney />}
      <OutcomeSnapshots items={data.outcomes} />
    </div>
  );
}


