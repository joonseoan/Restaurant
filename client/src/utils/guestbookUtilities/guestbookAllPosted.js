import React from "react";
import Display from "../../guestbooks/guestbook_display";
import ModalGuestbookDisplay from "../../components/MenuRecommendation/Show_guestbook/Modal_guestbook_display";
import { sortGuestbooks } from "../uIControl";

export function commonGroup() {
  const contents = (
    <div>
      <h1 className="heading heading-correct-pronounciation">
        <em>Customer's Best Choices</em>
      </h1>
      Please, click a title to view customer's recommendation.
    </div>
  );
  return contents;
}

export function guestbookAllPosted(guestbooks, postManage, path) {
  const contents = (
    <div>
      <Display
        guestbooks={sortGuestbooks(guestbooks)}
        postManage={postManage}
        path={path}
      />
    </div>
  );
  return contents;
}

export function modalGuestbookAllPosted(
  guestbooks,
  postManage,
  path,
  deleteModal
) {
  const contents = (
    <div>
      <ModalGuestbookDisplay
        guestbooks={sortGuestbooks(guestbooks)}
        postManage={postManage}
        path={path}
        deleteModal={deleteModal}
      />
    </div>
  );
  return contents;
}
