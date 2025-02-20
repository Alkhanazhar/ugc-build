"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CustomText from "@/components/GeneralComponents/customText";
import { setCampaignCreated } from "@/redux/slice/formSlice.js";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";

export default function CampaignCreated() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    dispatch(setCampaignCreated(false));
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    //   Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <Box
        style={{
          backgroundImage: "url(/form-background.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center center",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "100px",
        }}
      >
        <img
          src="/campaign-created.png"
          alt="Loading"
          style={{ width: "400px" }}
        />
        <Box
          sx={{
            transform: "translateY(-100px)",
          }}
        >
          <CustomText
            fontSize={isMobile ? "24px" : "48px"}
            text={"Reward Pool Created!"}
          />
        </Box>
      </Box>
    </div>
  );
}
