import { Stack } from "@mui/material"

const SessionLayout = ({ children }: React.PropsWithChildren) => (
	<Stack p={2}>
		{children}
	</Stack>
)

export default SessionLayout
