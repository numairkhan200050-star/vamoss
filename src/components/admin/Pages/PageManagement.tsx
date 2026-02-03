// src/components/admin/Pages/PageManagement.tsx
import React, { useState } from "react";
import { LabourPageForm, SupervisorPageForm } from "./PageForm"; // Separate forms
import { ShippingTierForm } from "../shipping/ShippingTierForm";

export const PageManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"labour" | "supervisor" | "shipping">("labour");

  return (
    <div className="flex flex-col space-y-4">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("labour")}
          className={`px-4 py-2 rounded ${activeTab === "labour" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Labour Pages
        </button>
        <button
          onClick={() => setActiveTab("supervisor")}
          className={`px-4 py-2 rounded ${activeTab === "supervisor" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Supervisor Pages
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={`px-4 py-2 rounded ${activeTab === "shipping" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Shipping Tiers
        </button>
      </div>

      {/* Content */}
      <div className="border p-4 rounded bg-white">
        {activeTab === "labour" && <LabourPageForm />}
        {activeTab === "supervisor" && <SupervisorPageForm />}
        {activeTab === "shipping" && <ShippingTierForm />}
      </div>
    </div>
  );
};
