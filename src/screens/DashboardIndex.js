import Tier0Dashboard from "../components/dashboard/Tier0Dashboard";
import Tier1Dashboard from "../components/dashboard/Tier1Dashboard";
import Tier2Dashboard from "../components/dashboard/Tier2Dashboard";
import React from "react";
import Users from "./Users";
import { Button, Divider } from "@mui/material";

const DashboardIndex = ({ user, pecuCoins }) => {
  const [tier, setTier] = React.useState(user.tier || 1);
  const [tab, setTab] = React.useState(0);
  const switchTier = () => {
    if (tier < 2) {
      setTier(tier + 1);
    }
    if (tier === 2) {
      setTier(0);
    }
  };

  return (
    <>
      <Divider color="black" />
      {(user.tier == 0 || user.tier == 1) && (
        <Button
          onClick={() => {
            switchTier();
          }}
          variant="outlined"
          sx={{
            color: "white",
            textTransform: "capitalize",
            m: 1,
          }}
        >
          Tier {tier}
        </Button>
      )}

      {tier === 0 && tab === 0 && (
        <Tier0Dashboard user={user} pecuCoins={pecuCoins} />
      )}
      {tier === 1 && tab === 0 && (
        <Tier1Dashboard user={user} pecuCoins={pecuCoins} />
      )}
      {tier === 2 && tab === 0 && (
        <Tier2Dashboard user={user} pecuCoins={pecuCoins} />
      )}
      {tab === "users" && <Users user={user} />}
    </>
  );
};

export default DashboardIndex;
