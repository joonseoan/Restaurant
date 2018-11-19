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

export function guestbookAllPosted(guestbooks) {
  const contents = (
    <div>
      <Display guestbooks={sortGuestbooks(guestbooks)} />
    </div>
  );
  return contents;
}

export function modalGuestbookAllPosted(guestbooks, deleteModal, postManage) {
  const contents = (
    <div>
      <ModalGuestbookDisplay
        guestbooks={sortGuestbooks(guestbooks)}
        deleteModal={deleteModal}
        postManage={postManage}
      />
    </div>
  );
  return contents;
}
