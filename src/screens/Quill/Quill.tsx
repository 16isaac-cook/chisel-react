import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";

import { QuillContextProvider, useQuillContext } from "./context/quill-context";

import Page from "src/shared/components/Page/Page";
import Container from "src/shared/components/Container/Container";
import SmallTitle from "src/shared/components/SmallTitle/SmallTitle";
import Panel from "src/shared/components/Panel/Panel";
import Button from "src/shared/components/Button/Button";
import Icon from "src/shared/components/Icon/Icon";
import CreateWorldPopup from "./components/worlds/CreateWorldPopup/CreateWorldPopup";
import Label from "src/shared/components/Label/Label";

import { useTauriContext } from "src/shared/context/tauri-context";
import { builderObjects } from "./constants/builderObjects";
import { World, WorldObjects, JsonFile } from "./types/quill.types";
import WorldList from "./components/worlds/WorldList/WorldList";
import Folder from "./components/builder/Folder/Folder";
import ObjectPicker from "./components/builder/ObjectPicker/ObjectPicker";
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
            <Container column={false} style={{ width: "100%", height: "100%" }}>
                {/* left panel, navigation */}
                <Container
                    style={{
                        width: "20%",
                        height: "100%",
                        marginRight: "0.3em",
                    }}
                    padding={false}
                >
                    <SmallTitle>Explorer</SmallTitle>
                    <Panel style={{ flex: "0 1 0", padding: "0.6em" }}>
                        <Button
                            variant="big"
                            icon="home"
                            style={{ width: "100%" }}
                            bottom={true}
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
                            style={{ width: "100%" }}
                            active={location.pathname.includes("worlds")}
                            onClick={() => {
                                navigate("/quill/worlds");
                            }}
                        >
                            Worlds
                        </Button>
                    </Panel>
                    <Panel
                        top={true}
                        bottom={true}
                        style={{
                            flex: "1 1 0",
                        }}
                    >
                        {quill.worldInfo.name ? (
                            <Label>{quill.worldInfo.name}</Label>
                        ) : (
                            <Label>Select a World to get started!</Label>
                        )}
                        <Container
                            style={{
                                overflowY: "auto",
                                overflowX: "hidden",
                                flex: "1 1 0",
                                width: "100%",
                                padding: "0.3em",
                            }}
                            justify="flex-start"
                        >
                            {quill.worldId ? (
                                <Container
                                    style={{
                                        overflowY: "auto",
                                        overflowX: "hidden",
                                        flex: "1 1 0",
                                        width: "100%",
                                    }}
                                    padding={false}
                                    justify="flex-start"
                                >
                                    <Button
                                        variant="big"
                                        icon="book"
                                        style={{
                                            width: "100%",
                                            marginBottom: "0.3em",
                                        }}
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
                                        style={{
                                            width: "100%",
                                            marginBottom: "0.3em",
                                        }}
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
                                        style={{
                                            width: "100%",
                                            marginBottom: "0.3em",
                                        }}
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
                                        style={{
                                            width: "100%",
                                            marginBottom: "0.3em",
                                        }}
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
                                        style={{
                                            width: "100%",
                                            marginBottom: "0.3em",
                                        }}
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
                                        style={{
                                            width: "100%",
                                            marginBottom: "0.3em",
                                        }}
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
                                        style={{ width: "100%" }}
                                        active={location.pathname.includes(
                                            "files"
                                        )}
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
                    <Panel style={{ flex: "0 1 0", padding: "0.6em" }}>
                        <Button
                            variant="big"
                            icon="settings"
                            style={{ width: "100%" }}
                            bottom={true}
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
                            style={{ width: "100%" }}
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
                <Container
                    style={{
                        width: "80%",
                        height: "100%",
                    }}
                    padding={false}
                >
                    <Outlet />
                </Container>
            </Container>
        </Page>
    );
};

export const QuillHome: React.FC = () => {
    return (
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>Home</SmallTitle>
            <Panel></Panel>
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
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>Worlds</SmallTitle>
            <Panel>
                <Container style={{ width: "100%" }}>
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
                <Button style={{ width: "100%" }} onClick={togglePopup}>
                    Create New World
                    <Icon icon="add" style={{ marginLeft: "0.3em" }} />
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
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>Overview - {quill.worldInfo.name}</SmallTitle>
            <Panel></Panel>
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
            <Container style={{ width: "100%" }} padding={false}>
                <SmallTitle>World Objects - {quill.worldInfo.name}</SmallTitle>
                <Container
                    style={{ width: "100%" }}
                    column={false}
                    padding={false}
                >
                    <Panel
                        title="World Objects"
                        right={true}
                        style={{ height: "100%", width: "25%" }}
                    ></Panel>
                    <Panel
                        title="Builder"
                        style={{
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Label>Loading world data...</Label>
                    </Panel>
                </Container>
            </Container>
        );
    }

    return (
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>World Objects - {quill.worldInfo.name}</SmallTitle>
            <Container style={{ width: "100%" }} column={false} padding={false}>
                <Panel
                    title="World Objects"
                    right={true}
                    style={{
                        height: "100%",
                        width: "25%",
                        maxWidth: "25%",
                    }}
                >
                    <Container
                        style={{
                            width: "100%",
                            flex: "1 0 0",
                            overflowY: "auto",
                            justifyContent: "flex-start",
                        }}
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
                <Panel title="Builder" style={{ height: "100%" }}>
                    <ObjectPicker />
                </Panel>
            </Container>
        </Container>
    );
};

export const QuillBuilderWorldObjectCreator: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>Builder - {quill.worldInfo.name}</SmallTitle>
            <Panel>
                <BuilderBaseComponent />
            </Panel>
        </Container>
    );
};

export const QuillBuilderMaps: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>Maps - {quill.worldInfo.name}</SmallTitle>
            <Panel></Panel>
        </Container>
    );
};

export const QuillBuilderHistory: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>History - {quill.worldInfo.name}</SmallTitle>
            <Panel></Panel>
        </Container>
    );
};

export const QuillBuilderCampaigns: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>Campaigns - {quill.worldInfo.name}</SmallTitle>
            <Panel></Panel>
        </Container>
    );
};

export const QuillBuilderWritingTools: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>Writing Tools - {quill.worldInfo.name}</SmallTitle>
            <Panel></Panel>
        </Container>
    );
};

export const QuillBuilderFiles: React.FC = () => {
    const quill = useQuillContext();

    return (
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>Files - {quill.worldInfo.name}</SmallTitle>
            <Panel></Panel>
        </Container>
    );
};

export const QuillSettings: React.FC = () => {
    return (
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>Settings</SmallTitle>
            <Panel></Panel>
        </Container>
    );
};

export const QuillHelp: React.FC = () => {
    return (
        <Container style={{ width: "100%" }} padding={false}>
            <SmallTitle>Help & Info</SmallTitle>
            <Panel></Panel>
        </Container>
    );
};
