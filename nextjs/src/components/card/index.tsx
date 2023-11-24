import Image from 'next/image'
import Link from 'next/link'
import { renderFlag } from '../flag'
import { getNationalityName } from '@/utils/getNationality'
import { IDataPerson } from '../../interface/dataServer'

interface CardsProps {
  item: IDataPerson
}

const transformId = (entityId: string) => entityId.replace(/\//g, '-')

const Card = ({ item }: CardsProps) => {
  return (
    <div className="card" data-testid="card">
      <div>
        <Image className="photo"
          width={60}
          height={60}
          alt={item.forename}
          src={item._links?.thumbnail ? item._links.thumbnail.href : '/assets/photo.webp'} />
      </div>
      <p>{item.forename}</p>
      <p>Date(s) of Birth Used: {item.date_of_birth}</p>
      <p>
        {Array.isArray(item.nationalities) &&
          item.nationalities.length > 0 ? (
          <span key={item.nationalities[0]} className="nationality">
            {renderFlag(item.nationalities[0])}
            <span>{getNationalityName(item.nationalities[0])}</span>
          </span>
        ) : (
          <span className="wrapperNoFlag">
            Unknown nationality
            <Image className="noFlag"
              alt=''
              src='/assets/noflag.png'
              width={32}
              height={32} />
          </span>
        )}
      </p>
      <Link
        href={`${transformId(item.entity_id)}`}
        className="viewMore"
      >
        view more
      </Link>
    </div>
  )
}

export default Card