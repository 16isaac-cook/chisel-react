import React from "react";
import { createHashRouter, RouterProvider } from "react-router";

import Home from "src/screens/Home/Home";
import GMTools from "src/screens/GMTools/GMTools";
import Quill, {
	QuillHome,
	QuillWorlds,
	QuillSettings,
	QuillHelp,
	QuillBuilder,
} from "src/screens/Quill/Quill";
import Hammer from "src/screens/Hammer/Hammer";
import PlayerTools from "src/screens/PlayerTools/PlayerTools";
import Scroll from "src/screens/Scroll/Scroll";
import ManageContent from "src/screens/ManageContent/ManageContent";
import HelpAndInfo from "src/screens/HelpAndInfo/HelpAndInfo";

const router = createHashRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/gm-tools",
		element: <GMTools />,
	},
	{
		path: "/quill",
		element: <Quill />,
		children: [
			{
				index: true,
				element: <QuillHome />,
			},
			{
				path: "worlds",
				element: <QuillWorlds />,
			},
			{
				path: "builder/:worldId",
				element: <QuillBuilder />,
			},
			{
				path: "settings",
				element: <QuillSettings />,
			},
			{
				path: "help",
				element: <QuillHelp />,
			},
		],
	},
	{
		path: "/hammer",
		element: <Hammer />,
	},
	{
		path: "/player-tools",
		element: <PlayerTools />,
	},
	{
		path: "/scroll",
		element: <Scroll />,
	},
	{
		path: "/manage-content",
		element: <ManageContent />,
	},
	{
		path: "/help-and-info",
		element: <HelpAndInfo />,
	},
]);

const Routes: React.FC = () => {
	return <RouterProvider router={router} />;
};

export default Routes;
