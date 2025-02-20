import { Box, Grid, useMediaQuery } from "@mui/material";
import Link from "next/link";

export default function FooterSection() {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <footer
      style={{
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {/* <Box
        style={{
          backgroundImage: "url(./footer-blur.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "150px",
          opacity: 0.95,
          filter: "blur(10px)",
        }}
      /> */}
      <Box
        // className="bottom-0 left-0 z-[10] absolute w-full h-[200px]"
        style={{
          maskImage: "linear-gradient(transparent, #FEEDB2 85%)",
          position: "absolute",
          backgroundColor: "#FEEDB2",
          top: 0,
          left: 0,
          zIndex: 10,
          height: "200px",
          transform: "rotate(180deg)",
          width: "100%",
        }}
      />
      <Box
        style={{
          paddingTop: "350px",
          backgroundImage: "url(./footer.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          style={{
            backgroundColor: "#201C18",
            borderRadius: "24px 24px 0px 0px",
            // marginTop: "300px",
            padding: isMobile ? "30px 30px" : "56px",
            position: "relative",
            height: isMobile ? "200px" : "350px",
          }}
        >
          <Box
            style={{
              position: "absolute",
              top: isMobile ? "-100px" : "-210px",
              left: isMobile ? "0px" : "210px",
            }}
          >
            <img
              src={isMobile ? "./Catfooter.png" : "./FooterCat.png"}
              alt="Footer Cat"
              height={isMobile ? "320px" : "560px"}
            />
          </Box>
          <Grid container display="flex" justifyContent="space-between">
            <Grid>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Grid
                  item
                  style={{
                    color: "#ffffff",
                    fontFamily: "Skrapbook",
                    fontSize: isMobile ? "24px" : "36px",
                    marginBottom: isMobile ? "10px" : "100px",
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  UGC.FUN
                </Grid>
              </Link>
              <Grid item>
                <Grid
                  container
                  spacing={1}
                  justifyContent={isMobile ? "center" : "flex-start"}
                >
                  <Grid item>
                  <a href="https://t.me/ugcdotfun" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./TeleIcon.png"
                      alt="Telegram Icon"
                      style={{
                        width: isMobile ? "20px" : "30px",
                        height: isMobile ? "20px" : "30px",
                      }}
                    />
                    </a>
                  </Grid>
                  <Grid item>
      <a href="https://x.com/createlayer" target="_blank" rel="noopener noreferrer">
        <img
          src="./TwitIcon.png"  // Twitter icon image
          alt="Twitter Icon"
          style={{
            width: isMobile ? "20px" : "30px",  // Adjust size based on screen size
            height: isMobile ? "20px" : "30px",  // Same for height
          }}
        />
      </a>
    </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              justifyContent="flex-end"
              style={{
                color: "#ffffff",
                fontFamily: "Skrapbook",
                fontSize: isMobile ? "16px" : "24px",
                textAlign: "right",
              }}
            >
              <Link
                style={{
                  marginBottom: isMobile ? "10px" : "20px",
                  color: "#ffffff",
                }}
                href="/form"
              >
                CREATE CAMPAIGN
              </Link>
              <Link
                style={{
                  marginBottom: isMobile ? "10px" : "20px",
                  color: "#ffffff",
                }}
                href="/all-campaigns"
              >
                CAMPAIGNS
              </Link>
              <Link
                style={{
                  marginBottom: isMobile ? "10px" : "20px",
                  color: "#ffffff",
                }}
                href="/privacy-policy-createlayer.pdf"
              >
                PRIVACY POLICY
              </Link>
              <Link
                style={{
                  marginBottom: isMobile ? "10px" : "20px",
                  color: "#ffffff",
                }}
                href="//TnC-createlayer.pdf"
              >
                TERMS & CONDITIONS
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </footer>
  );
}
