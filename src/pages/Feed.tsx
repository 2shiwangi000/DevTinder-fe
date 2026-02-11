import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { getUsersFeed } from "../service/feed";
import { addFeed, removeFeed } from "../store/slices/feedSlice";
import { useNotification } from "../context/NotificationContext";
import FeedCard from "./FeedCard";
import { sendConnectionReq } from "../service/user";

const Feed = () => {
  const dispatch = useAppDispatch();
  const { showAlert } = useNotification();
  const { currentFeed, total, page, limit, hasMore } = useAppSelector(
    (store) => store.feed,
  );
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const hasFetchedRef = React.useRef(false);

  const fetchFeed = async (page: number) => {
    setLoading(true);
    const res = await getUsersFeed({ page, limit });
    setLoading(false);

    if (res?.code === 200) {
      dispatch(addFeed(res.data));
    } else {
      showAlert(res?.message || "something went wrong", "error");
    }
  };

  const handleAction = async (
    status: "interested" | "ignored",
    userid: string,
  ) => {
    // TODO → accept / ignore API call
    sendConnectionReq({ userid, status }).then((res) => {
      if (res?.code === 200) {
        // showAlert(res?.message, "success");
        const nextIndex = index + 1;
        // if we reached end of current stack
        if (nextIndex === currentFeed.length && hasMore && !loading) {
          fetchFeed(page + 1);
        }
        setIndex(nextIndex);
      } else {
        showAlert(res?.message || "something went wrong", "error");
      }
    });
  };

  useEffect(() => {
    if (hasFetchedRef.current) return;

    hasFetchedRef.current = true;
    fetchFeed(1);

    return () => {
      // cleanup logic here
      hasFetchedRef.current = false; // reset ref if needed
      dispatch(removeFeed());
    };
  }, []);

  if (!currentFeed[index] && !hasMore) {
    return <div className="mt-10 text-center">No more devs 😴</div>;
  }

  return (
    <div className="flex justify-center mt-2 mb-2">
      {currentFeed[index] && (
        <FeedCard
          key={currentFeed[index]._id}
          user={currentFeed[index]}
          onAccept={() => handleAction("interested", currentFeed[index]._id)}
          onIgnore={() => handleAction("ignored", currentFeed[index]._id)}
        />
      )}

      {loading && <span className="loading loading-spinner" />}
    </div>
  );
};

export default Feed;
