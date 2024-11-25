import "styled-components";
import { Theme } from "../util/styles";

declare module "styled-components" {
	export interface DefaultTheme extends Theme {}
}
