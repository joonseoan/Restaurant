import React from "react";
import Display from "../../guestbooks/guestbook_display";
import ModalGuestbookDisplay from "../../components/MenuRecommendation/Show_guestbook/Modal_guestbook_display";
import { sortGuestbooks } from "../uIControl";

export function commonGroup() {
  const contents = (
    <div>
      <h1 className="heading heading-correct-pronounciation">
        <em>Your Posts</em>
      </h1>
      Please, click a title to view customer's recommendation.
    </div>
  );
  return contents;
}

export function modalGuestbookDisplay(userGuestbooks, deleteModal, postManage) {
  const contents = (
    <div>
      {userGuestbooks.length === 0 ? (
        <h3>Your posts are not available.</h3>
      ) : (
        <ModalGuestbookDisplay
          guestbooks={sortGuestbooks(userGuestbooks)}
          deleteModal={deleteModal}
          postManage={postManage}
        />
      )}
    </div>
  );
  return contents;
}

export function guestbookDisplay(userGuestbooks) {
  const contents = <Display guestbooks={sortGuestbooks(userGuestbooks)} />;
  return contents;
}
