import type { ITabsNavigation } from "../types/types"

import HandBookStack from "./stack-handbooks";
import DocumentsStack from "./stack-documents";
import ProfileStack from "./stack-profile";

import IndexHR from "screens/hr";
import IndexStructure from "screens/structure";

const imgHUB = require('assets/image/pattern.png')
const imgEDS = require( 'assets/image/eds.png')
const imgHD = require( 'assets/image/hd.png')
const imgHR = require('assets/image/hr.png')
const imgPROFILE = require('assets/image/profile.png')

export const TABS: ITabsNavigation[] = [
        {
                name: 'handbooks',
                component: HandBookStack,
                icon: imgHUB,
        },
        {
                name: 'structure',
                component: IndexStructure,
                icon: imgHR,
        },
        {
                name: 'СЭД',
                component: DocumentsStack,
                icon: imgEDS,
        },
        {
                name: 'Technical_support',
                component: IndexHR,
                icon: imgHD,
        },
        {
                name: 'My_Profile',
                component: ProfileStack,
                icon: imgPROFILE,
        },
]