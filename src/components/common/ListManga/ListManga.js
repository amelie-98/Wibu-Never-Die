import React, { useState, useEffect, useMemo } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import find from "lodash/find";
import { useCurrentRoute } from "react-navi";

import Manga from "./Manga";
import FavoritesList from "../FavoritesList";
import ListMangaWrapper from "./ListManga.style";
import * as actions from "../../../actions/index";
import {
  toastSuccess,
  toastError,
  toastWarning
} from "../../../Helper/ToastHelper";

import HeartGif from "../../../asses/image/HeartGif.gif";
import CryGif from "../../../asses/image/CryGif.gif";

const ListManga = ({ manga, getManga, currentUser, textMangaFilter }) => {
  const currentRoute = useCurrentRoute().url.pathname;
  const [showFavoritesList, setShowFavoritesList] = useState(false);
  const [hoverFavoritesList, setHoverFavoritesList] = useState(false);
  useEffect(() => {
    getManga();
    // eslint-disable-next-line
  }, []);
  const addToFavoritesList = id => {
    toastSuccess(
      `Đã Thêm ${
        find(manga, item => item.id === id).name
      } Vào Danh Sách Yêu Thích`
    );
    toastError(
      `${
        find(manga, item => item.id === id).name
      } Đã Có Trong Vào Danh Sách Yêu Thích`
    );
    toastWarning(
      `${
        find(manga, item => item.id === id).name
      } Đã Có Trong Vào Danh Sách Yêu Thích`
    );
  };
  const listManga = useMemo(
    () =>
      manga.filter(item =>
        item.name.toLowerCase().includes(textMangaFilter.toLowerCase())
      ),
    [manga, textMangaFilter]
  );
  return (
    <ListMangaWrapper>
      <div className="list-manga">
        {!hoverFavoritesList && <div className="background-image-blur" />}
        {hoverFavoritesList && (
          <div
            className="background-image-blur"
            style={{
              background: `url(${
                currentRoute === "/Wibu-Never-Die"
                  ? `${HeartGif}`
                  : currentRoute === "/Wibu-Never-Die/Favorites-Page"
                  ? `${CryGif}`
                  : ""
              })`,
              filter: "blur(0px)",
              WebkitFilter: "blur(0px)"
            }}
          />
        )}
        <div id="main-content-scroll" className="main-content">
          <Row>
            {listManga.map((manga, index) => (
              <Col sm="6" key={index}>
                <div className="cover-manga">
                  <Manga
                    manga={manga}
                    addToFavoritesList={addToFavoritesList}
                    setShowFavoritesList={setShowFavoritesList}
                    showFavoritesList={showFavoritesList}
                  />
                </div>
              </Col>
            ))}
          </Row>
          {!!currentUser.id && showFavoritesList && (
            <FavoritesList setHoverFavoritesList={setHoverFavoritesList} />
          )}
        </div>
      </div>
    </ListMangaWrapper>
  );
};

const mapStatetoProps = state => {
  return {
    manga: state.manga,
    currentUser: state.currentUser,
    textMangaFilter: state.textMangaFilter
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getManga: data => {
      dispatch(actions.getManga(data));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ListManga);
