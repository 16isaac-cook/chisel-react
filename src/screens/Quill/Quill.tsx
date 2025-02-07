import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { QuillContextProvider, useQuillContext } from "./context/quill-context";

import Page from "src/shared/components/Page/Page";
import Container from "src/shared/components/Container/Container";
import SmallTitle from "src/shared/components/SmallTitle/SmallTitle";
import Panel from "src/shared/components/Panel/Panel";
import Button from "src/shared/components/Button/Button";
import Icon from "src/shared/components/Icon/Icon";
import CreateWorldPopup from "./components/worlds/CreateWorldPopup/CreateWorldPopup";
import Label from "src/shared/components/Label/Label";

import { builderObjects } from "./constants/builderObjects";
import WorldList from "./components/worlds/WorldList/WorldList";
import Folder from "./components/builder/Folder/Folder";
import BuilderBaseComponent from "./components/builder/BaseComponent/BaseComponent";

const Quill: React.FC = () => {
    return (
        <QuillContextProvider>
            <QuillLoader />
        </QuillContextProvider>
    );
};

export default Quill;

const QuillLoader: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const quill = useQuillContext();

    const [loading, setLoading] = useState(true);

    const { loadWorlds } = quill;

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                await loadWorlds();
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [loadWorlds]);

    if (loading) {
        return <Container />;
    }

    return (
        <Page title="Quill" back="/gm-tools">
            <Container wide tall padding>
                {/* left panel, navigation */}
                <Container column right tall wide="20%">
                    <SmallTitle>Explorer</SmallTitle>
                    <Panel column flex="0 1 0" padding="0.6em">
                        <Button
                            variant="big"
                            icon="home"
                            wide
                            bottom
                            active={location.pathname === "/quill"}
                            onClick={() => {
                                navigate("/quill");
                            }}
                        >
                            Home
                        </Button>
                        <Button
                            variant="big"
                            icon="globe"
                            wide
                            active={location.pathname.includes("worlds")}
                            onClick={() => {
                                navigate("/quill/worlds");
                            }}
                        >
                            Worlds
                        </Button>
                    </Panel>
                    <Panel column top bottom flex="1 1 0">
                        {quill.worldInfo.name ? (
                            <Label>{quill.worldInfo.name}</Label>
                        ) : (
                            <Label>Select a World to get started!</Label>
                        )}
                        <Container
                            column
                            flex="1 1 0"
                            padding="0.3em"
                            wide
                            justify="flex-start"
                        >
                            {quill.worldId ? (
                                <Container
                                    column
                                    flex="1 1 0"
                                    wide
                                    justify="flex-start"
                                    overflowy="auto"
                                    overflowx="hidden"
                                >
                                    <Button
                                        variant="big"
                                        icon="book"
                                        wide
                                        bottom
                                        active={location.pathname.includes(
                                            "overview"
                                        )}
                                        onClick={() => {
                                            navigate(
                                                `/quill/builder/${quill.worldId}/overview`
                                            );
                                        }}
                                    >
                                        Overview
                                    </Button>
                                    <Button
                                        variant="big"
                                        icon="world"
                                        wide
                                        bottom
                                        active={location.pathname.includes(
                                            "world-objects"
                                        )}
                                        onClick={() => {
                                            navigate(
                                                `/quill/builder/${quill.worldId}/world-objects`
                                            );
                                        }}
                                    >
                                        World Objects
                                    </Button>
                                    <Button
                                        variant="big"
                                        icon="map"
                                        wide
                                        bottom
                                        active={location.pathname.includes(
                                            "maps"
                                        )}
                                        onClick={() => {
                                            navigate(
                                                `/quill/builder/${quill.worldId}/maps`
                                            );
                                        }}
                                    >
                                        Maps
                                    </Button>
                                    <Button
                                        variant="big"
                                        icon="hourglass"
                                        wide
                                        bottom
                                        active={location.pathname.includes(
                                            "history"
                                        )}
                                        onClick={() => {
                                            navigate(
                                                `/quill/builder/${quill.worldId}/history`
                                            );
                                        }}
                                    >
                                        History
                                    </Button>
                                    <Button
                                        variant="big"
                                        icon="team"
                                        wide
                                        bottom
                                        active={location.pathname.includes(
                                            "campaigns"
                                        )}
                                        onClick={() => {
                                            navigate(
                                                `/quill/builder/${quill.worldId}/campaigns`
                                            );
                                        }}
                                    >
                                        Campaigns
                                    </Button>
                                    <Button
                                        variant="big"
                                        icon="pen"
                                        wide
                                        bottom
                                        active={location.pathname.includes(
                                            "writing-tools"
                                        )}
                                        onClick={() => {
                                            navigate(
                                                `/quill/builder/${quill.worldId}/writing-tools`
                                            );
                                        }}
                                    >
                                        Writing Tools
                                    </Button>
                                    <Button
                                        variant="big"
                                        icon="files"
                                        wide
                                        bottom
                                        onClick={() => {
                                            navigate(
                                                `/quill/builder/${quill.worldId}/files`
                                            );
                                        }}
                                    >
                                        Files
                                    </Button>
                                </Container>
                            ) : null}
                        </Container>
                    </Panel>
                    <Panel column padding="0.6em" flex="0 1 0">
                        <Button
                            variant="big"
                            icon="settings"
                            wide
                            bottom
                            active={location.pathname.includes("settings")}
                            onClick={() => {
                                navigate("/quill/settings");
                            }}
                        >
                            Settings
                        </Button>
                        <Button
                            variant="big"
                            icon="help"
                            wide
                            active={location.pathname.includes("help")}
                            onClick={() => {
                                navigate("/quill/help");
                            }}
                        >
                            Help & Info
                        </Button>
                    </Panel>
                </Container>

                {/* right panel, content */}
                <Container column wide="80%" tall>
                    <Outlet />
                </Container>
            </Container>
        </Page>
    );
};

export const QuillHome: React.FC = () => {
    return (
        <Container column wide>
            <SmallTitle>Home</SmallTitle>
            <Panel column></Panel>
        </Container>
    );
};

export const QuillWorlds: React.FC = () => {
    const quill = useQuillContext();
    const navigate = useNavigate();

    const [popupOpen, setPopupOpen] = useState(false);

    const togglePopup = () => {
        setPopupOpen(!popupOpen);
    };

    const setWorldId = (worldId: string) => {
        quill.setWorldId(worldId);
        navigate(`/quill/builder/${worldId}/overview`);
    };

    return (
        <Container column wide>
            <SmallTitle>Worlds</SmallTitle>
            <Panel column>
                <Container column wide>
                    <WorldList
                        worlds={quill.worldList.map((world) => {
                            return {
                                worldId: world.worldId,
                                label: world.name,
                                theme: world.theme,
                            };
                        })}
                        setWorldId={setWorldId}
                    />
                </Container>
                <Button wide onClick={togglePopup}>
                    Create New World
                    <Icon icon="add" left />
                </Button>
            </Panel>
            {popupOpen ? (
                <CreateWorldPopup
                    close={togglePopup}
                    reload={quill.loadWorlds}
                />
            ) : null}
        </Container>
    );
};

export const QuillBuilder: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container column wide>
            <SmallTitle>Overview - {quill.worldInfo.name}</SmallTitle>
            <Panel column></Panel>
        </Container>
    );
};

export const QuillBuilderWorldObjects: React.FC = () => {
    const quill = useQuillContext();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (quill.worldInfo.name) {
            setLoading(false);
        }
    }, [quill.worldInfo.name]);

    if (loading) {
        return (
            <Container column wide>
                <SmallTitle>World Objects - {quill.worldInfo.name}</SmallTitle>
                <Container wide>
                    <Panel
                        column
                        title="World Objects"
                        right
                        tall
                        wide="25%"
                        style={{
                            maxWidth: "25%",
                        }}
                    ></Panel>
                    <Panel
                        column
                        title="Builder"
                        tall
                        justify="center"
                        align="center"
                    >
                        <Label>Loading world data...</Label>
                    </Panel>
                </Container>
            </Container>
        );
    }

    return (
        <Container column wide>
            <SmallTitle>World Objects - {quill.worldInfo.name}</SmallTitle>
            <Container wide>
                <Panel
                    column
                    title="World Objects"
                    right
                    tall
                    wide="25%"
                    style={{
                        maxWidth: "25%",
                    }}
                >
                    <Container
                        column
                        flex="1 0 0"
                        justify="flex-start"
                        wide
                        overflowy="auto"
                    >
                        {quill.worldInfo.name
                            ? Object.entries(builderObjects).map(
                                  ([obj, value]) => {
                                      const items = quill.worldObjects[obj];
                                      if (items.length > 0) {
                                          return (
                                              <Folder
                                                  folderId={obj}
                                                  worldId={
                                                      quill.worldInfo.worldId
                                                  }
                                                  icon={value.icon}
                                                  itemList={items}
                                                  key={obj}
                                              >
                                                  {value.plural
                                                      ? value.plural
                                                      : value.name + "s"}
                                              </Folder>
                                          );
                                      } else {
                                          return null;
                                      }
                                  }
                              )
                            : null}
                    </Container>
                </Panel>
                <Panel column tall title="World Object Builder">
                    <Outlet />
                </Panel>
            </Container>
        </Container>
    );
};

export const QuillBuilderWorldObjectCreator: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container column wide>
            <Panel column>
                <BuilderBaseComponent />
            </Panel>
        </Container>
    );
};

export const QuillBuilderMaps: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container column wide>
            <SmallTitle>Maps - {quill.worldInfo.name}</SmallTitle>
            <Panel column></Panel>
        </Container>
    );
};

export const QuillBuilderHistory: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container column wide>
            <SmallTitle>History - {quill.worldInfo.name}</SmallTitle>
            <Panel column></Panel>
        </Container>
    );
};

export const QuillBuilderCampaigns: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container column wide>
            <SmallTitle>Campaigns - {quill.worldInfo.name}</SmallTitle>
            <Panel column></Panel>
        </Container>
    );
};

export const QuillBuilderWritingTools: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container column wide>
            <SmallTitle>Writing Tools - {quill.worldInfo.name}</SmallTitle>
            <Panel column></Panel>
        </Container>
    );
};

export const QuillBuilderFiles: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container column wide>
            <SmallTitle>Files - {quill.worldInfo.name}</SmallTitle>
            <Panel column></Panel>
        </Container>
    );
};

export const QuillSettings: React.FC = () => {
    return (
        <Container column wide>
            <SmallTitle>Settings</SmallTitle>
            <Panel column></Panel>
        </Container>
    );
};

export const QuillHelp: React.FC = () => {
    return (
        <Container column wide>
            <SmallTitle>Help & Info</SmallTitle>
            <Panel column></Panel>
        </Container>
    );
};
