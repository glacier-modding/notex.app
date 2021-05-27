// @ts-nocheck

import React from "react"
import Header from "../../../src/Header"
import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"

const XteaImage = dynamic(() => import("../../../src/XteaImage"))

export default function Xtea() {
    return (
        <div>
            <Head>
                <title>XTEA Online Tool - Notex.app</title>
                <meta
                    name="keywords"
                    content="glacier engine, hitman, tools, resources, modding, mod, rpkg, locr, rtlv, dlge, gfxf, unpack, pack, xtea"
                />
            </Head>

            <div className="container">
                <Header logo={<XteaImage />} />

                <p id="failed-load-notif">
                    You may need to reload the page unless you see the big box
                    below. Sorry about that.
                </p>

                <Link href="/xtea/prepatched">
                    <h2 className="description" style={{ color: "white", cursor: "pointer" }}>
                        Looking for a version of <code>packagedefinition.txt</code> that is already patched? Click here!
                    </h2>
                </Link>

                <main className="main"></main>
            </div>
        </div>
    )
}
