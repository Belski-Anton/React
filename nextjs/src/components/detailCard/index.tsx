'use client'
import { useEffect } from 'react'
import moment from 'moment'
import Image from 'next/image'
import { renderFlag } from '@/components/flag'
import { getNationalityName } from '@/utils/getNationality'
import { useGetPersonByIdQuery } from '../../../api/index'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { changeFlagDetail } from '../../../store/loading/loadingSlice'

type Props = {
  id: string
}

export default function DetailCard({ id }: Props) {
  const dispatch = useAppDispatch()
  const { isLoadingData, isLoadingDetail } = useAppSelector((state) => state.load)
  const { data, isLoading } = useGetPersonByIdQuery(id)

  useEffect(() => {
    if (isLoading) {
      dispatch(changeFlagDetail(true))
    } else {
      dispatch(changeFlagDetail(false))
    }

  }, [isLoading, dispatch])

  return (
    <>
      {!!data && <div className="wrapperDetails">
        <div className="wrapperCross">
          <Image className="cross"
            src='/assets/close.png'
            alt="close"
            width={30}
            height={30}
            onClick={() => window.location.href = '/'}
          />
        </div>
        <div className="wrapperPhoto">
          <Image className="photo"
            width={60}
            height={60}
            alt={data.forename}
            src={data._links?.thumbnail ? `${data._links.thumbnail.href}` : '/assets/photo.webp'}
          />
        </div>
        <div>Forename:{data.forename}</div>
        <div>Name:{data.name}</div>
        <div>Place of Birth: {data.place_of_birth}</div>
        <div>
          Age:{' '}
          {moment(data.date_of_birth, 'YYYY/MM/DD').fromNow(true)}
        </div>
        <div>Height:{data.height}</div>
        <div>Weigt:{data.weight}</div>
        <div>
          Gender:{' '}
          {data.sex_id === 'M'
            ? 'Male'
            : data.sex_id === 'F'
              ? 'Female'
              : data.sex_id}
        </div>
        <div className="nationalite">
          Nationality :{' '}
          {Array.isArray(data.nationalities) &&
            data.nationalities.length > 0
            ? data.nationalities.map((code) => (
              <span key={code} className="nationality">
                <div className="flag">
                  {' '}
                  {renderFlag(code)}
                </div>
                <span>{getNationalityName(code)}</span>
              </span>
            ))
            : 'No nationalities available'}
        </div>
        <div>
          <h3 className="arrestWarrants">Arrest warrant:</h3>
        </div>
        {!!data.arrest_warrants.length && (
          <div className="descrCard">
            {data?.arrest_warrants[0].charge}
          </div>
        )}
      </div>}</>
  )
}



