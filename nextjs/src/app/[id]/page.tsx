import Cards from "@/components/cards";
import DetailCard from "../../components/detailCard";

import './style.css'

type Props = {
  params: {
    id: string
  }
}

export default function Detail({ params: { id } }: Props) {
  return (
    <div className='wrapperContent'>
      <Cards />
      <DetailCard id={id} />
    </div>
  )
}
