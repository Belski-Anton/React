"use client";
import "./style.css";
import Loading from "../loading";
import Card from "../card/index";
import { useGetPersonsQuery } from "../../../api/index";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeFlagData } from "../../../store/loading/loadingSlice";
import {
  changePage,
  changeTotalPage,
} from "../../../store/dataForApi/dataForApiSlice";

export default function Cards() {

  const dispatch = useAppDispatch();
  const { isLoadingData, isLoadingDetail } = useAppSelector(
    (state) => state.load
  );
  const { page, resultPerPage, forename } = useAppSelector(
    (state) => state.dataForApiSlice
  );
  const { data, isLoading } = useGetPersonsQuery({
    page,
    resultPerPage,
    forename,
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(changeFlagData(true));
    } else {
      dispatch(changeFlagData(false));
    }
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(changeTotalPage(Math.ceil(data.total / +resultPerPage)));
      !data.total && dispatch(changePage("1"));
    }
  }, [data, isLoading, dispatch, resultPerPage]);

  return (
    <>
      {!!(isLoadingData || isLoadingDetail) ? (
        <Loading />
      ) : !!(data && data?._embedded.notices.length) ? (
        <div className="wrapperMain">
          {data._embedded.notices.map((item, idx) => (
            <Card key={`item-${item.entity_id}-${idx}`} item={item} />
          ))}
        </div>
      ) : (
        <div className="load">Nothing was found for your request</div>
      )}
    </>
  );
}
