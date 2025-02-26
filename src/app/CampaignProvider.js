"use client";
import { useHomeAction } from "@/action/homeAction";
import { useCallback, useEffect, useState } from "react";

export function CampaignProvider({ children }) {
  const { fetchCampaigns } = useHomeAction();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCampaignsMemoized = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchCampaigns();
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchCampaigns]);

  useEffect(() => {
    fetchCampaignsMemoized();

    const interval = setInterval(() => {
      fetchCampaignsMemoized();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchCampaignsMemoized]);

  return children;
}