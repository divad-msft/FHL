import { useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
} from "@fluentui/react-components";
import { app } from "@microsoft/teams-js";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "./Context";
import { List, ListItem } from "@fluentui/react-list";

export function Home(props: { showFunction?: boolean; environment?: string }) {
  const [remindItems, setRemindItems] = useState<
    { title: string; details: string; dueTime: string }[]
  >([]);

  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data!.displayName;
  const hubName = useData(async () => {
    await app.initialize();
    const context = await app.getContext();
    return context.app.host.name;
  })?.data;

  useEffect(() => {
    // Fetch remind items from an API or other source
    const fetchRemindItems = async () => {
      // Replace with your data fetching logic
      const items = [
        {
          title: "Meeting with Team",
          details: "Discuss project updates and next steps.",
          dueTime: "10:00 AM",
        },
        {
          title: "Submit Report",
          details: "Complete and submit the quarterly report.",
          dueTime: "12:00 PM",
        },
        {
          title: "Client Call",
          details: "Call with the client to review requirements.",
          dueTime: "2:00 PM",
        },
        {
          title: "Code Review",
          details: "Review the latest pull requests.",
          dueTime: "3:00 PM",
        },
        {
          title: "Team Lunch",
          details: "Lunch with the team at the new restaurant.",
          dueTime: "1:00 PM",
        },
        {
          title: "Project Deadline",
          details: "Final deadline for the project submission.",
          dueTime: "5:00 PM",
        },
        {
          title: "One-on-One",
          details: "One-on-one meeting with the manager.",
          dueTime: "11:00 AM",
        },
        {
          title: "Workshop",
          details: "Attend the React workshop.",
          dueTime: "4:00 PM",
        },
        {
          title: "Update Documentation",
          details: "Update the project documentation.",
          dueTime: "6:00 PM",
        },
        {
          title: "Plan Sprint",
          details: "Plan the tasks for the next sprint.",
          dueTime: "9:00 AM",
        },
      ];
      setRemindItems(items);
    };
    fetchRemindItems();
  }, []);

  return (
    <div>
      <h1>Welcome to Remind, {userName}</h1>
      <List>
        {remindItems.map((item, index) => (
          <ListItem key={index} style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <div>
                <strong>{item.title}</strong> - {item.details} (Due:{" "}
                {item.dueTime})
              </div>
              <div>
                <Button
                  appearance="primary"
                  size="small"
                  style={{
                    marginRight: "8px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                  }}
                >
                  Complete
                </Button>
                <Button
                  appearance="secondary"
                  size="small"
                  style={{
                    marginRight: "8px",
                    backgroundColor: "#2196F3",
                    color: "white",
                  }}
                >
                  Edit
                </Button>
                <Button
                  appearance="secondary"
                  size="small"
                  style={{ backgroundColor: "#f44336", color: "white" }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
