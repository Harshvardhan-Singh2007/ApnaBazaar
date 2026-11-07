import { ArrowLeft, Compass } from 'lucide-react'
import { Button } from '../components/common.jsx'
export default function NotFound(){return <div className="wrap not-found"><span className="not-found-icon"><Compass size={28}/></span><span className="eyebrow">A LITTLE DETOUR</span><h1>Nothing to see<br/><em>this way.</em></h1><p>This page seems to have wandered off. Let’s get you somewhere lovely.</p><Button to="/">Back to the bazaar <ArrowLeft size={17}/></Button></div>}
