import React from "react"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    createMuiTheme,
    withStyles,
    ThemeProvider,
} from "@material-ui/core"
import { green } from "@material-ui/core/colors"
import Head from "next/head"
import Link from "next/link"
import Header from "../src/Header"
import dynamic from "next/dynamic"
import { latest, RpkgVersion, versions } from "../src/RpkgVersions"
import { renderToString } from "react-dom/server"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const RpkgImage = dynamic(() => import("../src/RpkgImage"))

interface DownloadButtonProps {
    versionId: string
}

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
    },
    typography: {
        fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;",
    },
    overrides: {
        MuiButton: {
            root: {
                marginBottom: "20px",
            },
        },
    },
})

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700],
        },
        marginBottom: "20px",
        letterSpacing: "0em",
    },
}))(Button)

function DownloadButton({ versionId }: DownloadButtonProps) {
    return (
        <Link href={`/tools/rpkg/rpkg_v${versionId}.zip`}>
            <ColorButton variant="outlined">
                <b>Download v{versionId}</b>
            </ColorButton>
        </Link>
    )
}

// we should probably check why these 2 constants need to

const rpkgVersions = versions.map((v) => {
    // @ts-expect-error Yup
    v.changelog = renderToString(v.changelog)
    return v
}) as (RpkgVersion & { changelog: string })[]

const rpkgLatest = {
    id: latest.id,
    changelog: renderToString(latest.changelog),
}

export default function Rpkg() {
    const [imgOpen, setImgOpen] = React.useState<boolean>(false)

    return (
        <div className="container">
            <Head>
                <title>Notex.app - RPKG Tool</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="keywords"
                    content="glacier engine, hitman, tools, resources, modding, mod, rpkg, locr, rtlv, dlge, gfxf, unpack, pack"
                />
            </Head>

            <Header />

            <ThemeProvider theme={darkTheme}>
                <main className="main">
                    <h1 className="title">RPKG</h1>

                    <h2 className="is-gray">
                        Developed by{" "}
                        <span className="is-not-gray">[REDACTED]</span> and
                        hosted by Notex.
                    </h2>

                    <DownloadButton versionId={rpkgLatest.id} />

                    <Button
                        variant="outlined"
                        onClick={() => setImgOpen(!imgOpen)}
                    >
                        {imgOpen ? "Hide Demo" : "Show Demo"}
                    </Button>

                    {imgOpen ? <RpkgImage /> : null}

                    {rpkgVersions.map((v) => (
                        <Accordion key={v.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`changelog-${v.id}-content`}
                                id={`changelog-${v.id}-header`}
                            >
                                <p>New in v{v.id}</p>
                            </AccordionSummary>
                            <AccordionDetails className="changelog">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: v.changelog,
                                    }}
                                />
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </main>
            </ThemeProvider>
        </div>
    )
}
