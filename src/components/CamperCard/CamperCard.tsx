
import type { Camper } from "@/src/types/camper"
import Image from "next/image"
interface CamperProps{
    camper: Camper
}

export default function CamperCard({camper}: CamperProps) {
    return (
        <li>
            <Image src={camper.coverImage} alt={camper.name} width='300' height='300'></Image>
            <h2>{camper.name}</h2>
            <p>{ camper.price}</p>
            <p>{camper.rating}</p>
            <p>{ camper.totalReviews}</p>
            <p>{camper.location}</p>
            <p>{camper.description}</p>
            <p>{camper.engine}</p>
            <p>{camper.transmission}</p>
            <p>{ camper.form}</p>
        </li>
    )
}