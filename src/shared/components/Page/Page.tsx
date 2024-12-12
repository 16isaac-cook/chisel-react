import { StyledPage } from "./Page.styles";
import TitleBar from "../TitleBar/TitleBar";

interface Props {
    title: string;
    home?: boolean;
}

const Page: React.FC<Props> = ({title, home = false}) => {
    return (
        <StyledPage>
            <TitleBar title={title} home={home} />
        </StyledPage>
    );
};

export default Page;