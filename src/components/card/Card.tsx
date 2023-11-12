import noflag from '../../assets/img/noflag.png'
import photo from '../../assets/img/photo.webp'
import { renderFlag, getNationalityName } from '../main/Main'
import { Person } from '../main/Main'
interface CardsProps {
    item: Person
    openDetails: (arg: string) => void
}

const Card = ({ item, openDetails }: CardsProps) => {
    return (
        <div className="card" data-testid="card">
            <div>
                {item._links?.thumbnail ? (
                    <img
                        className="photo"
                        alt={item.forename}
                        src={item._links.thumbnail.href}
                    />
                ) : (
                    <img className="photo" alt={item.forename} src={photo} />
                )}
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
                        <img className="noFlag" src={noflag} alt="flag" />
                    </span>
                )}
            </p>
            <span
                className="viewMore"
                onClick={() => openDetails(item.entity_id)}
            >
                view more
            </span>
        </div>
    )
}

export default Card
