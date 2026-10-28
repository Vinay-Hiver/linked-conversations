import React from 'react';
import { createPortal } from 'react-dom';
import { MAX_FAVOURITES } from '../data/dummyViews';
import {
  BackIcon, SearchIcon, StarIcon, DragHandleIcon, ViewTypeIcon, KebabIcon,
  UsersStarIcon, RenameIcon, PencilIcon, TrashIcon, HeartCircleIcon, TeamFavRowIcon,
} from './viewIcons';

// 1x1 transparent image used to suppress the browser's native drag ghost.
const EMPTY_DRAG_IMAGE = typeof Image !== 'undefined' ? new Image() : null;
if (EMPTY_DRAG_IMAGE) {
  EMPTY_DRAG_IMAGE.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7';
}

// `viewsData` = { views: [...], favouriteIds: [...] } for the current inbox.
// This component is fully controlled — all favourite/reorder changes are
// reported up via onChange so the home nav (favourite views) stays in sync.
const AllViewsPanel = ({ inboxName, onBack, activeFilter, onFilterChange, viewsData, onChange, activeRole }) => {
  const [search, setSearch] = React.useState('');
  const [draggedId, setDraggedId] = React.useState(null);
  const [menuOpenFor, setMenuOpenFor] = React.useState(null);
  const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });
  const [starTooltipFor, setStarTooltipFor] = React.useState(null);
  const [starTooltipPosition, setStarTooltipPosition] = React.useState({ top: 0, left: 0 });

  const views = viewsData?.views || [];
  // Admin and Agent each have their own personal Favourites for this inbox.
  const favouriteIdsByRole = viewsData?.favouriteIds || {};
  const favouriteIds = favouriteIdsByRole[activeRole] || [];
  const teamFavouriteIds = viewsData?.teamFavouriteIds || [];
  // The single merged, drag-reorderable order of personal + Team Favourites
  // for this role — see the comment in data/dummyViews.js.
  const sidebarOrderByRole = viewsData?.sidebarOrder || {};
  const sidebarOrder = sidebarOrderByRole[activeRole] || favouriteIds;

  // Close the kebab menu on any click outside of it.
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    if (!menuOpenFor) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenFor(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpenFor]);

  const viewsById = React.useMemo(() => {
    const map = {};
    views.forEach((v) => { map[v.id] = v; });
    return map;
  }, [views]);

  // FLIP: whenever the favourites order changes, slide rows from their old
  // position to their new one instead of letting them jump — the "other
  // cards move out of the way" feel of a basic reorderable list.
  const rowRefs = React.useRef({});
  const prevRectsRef = React.useRef({});
  React.useLayoutEffect(() => {
    const nextRects = {};
    sidebarOrder.forEach((id) => {
      const el = rowRefs.current[id];
      if (el) nextRects[id] = el.getBoundingClientRect();
    });
    sidebarOrder.forEach((id) => {
      const prev = prevRectsRef.current[id];
      const next = nextRects[id];
      const el = rowRefs.current[id];
      if (!prev || !next || !el) return;
      const deltaY = prev.top - next.top;
      if (deltaY) {
        el.style.transition = 'none';
        el.style.transform = `translateY(${deltaY}px)`;
        // Force layout so the browser commits the offset above before we
        // flip the transition back on — otherwise it can coalesce both
        // style writes into one frame and the move never animates.
        // eslint-disable-next-line no-unused-expressions
        el.offsetHeight;
        el.style.transition = 'transform 220ms ease';
        el.style.transform = '';
      }
    });
    prevRectsRef.current = nextRects;
  }, [sidebarOrder.join('|')]);

  if (!viewsData) return null;

  const toggleFavourite = (id) => {
    const isFavourited = favouriteIds.includes(id);
    // At the cap, clicking an unfavourited star is a no-op — the hover
    // tooltip already explains why, nothing else needs to happen.
    if (!isFavourited && favouriteIds.length >= MAX_FAVOURITES) return;
    const nextFavouriteIds = isFavourited
      ? favouriteIds.filter((favId) => favId !== id)
      : [...favouriteIds, id];
    const nextOrder = isFavourited
      ? sidebarOrder.filter((favId) => favId !== id)
      : sidebarOrder.includes(id) ? sidebarOrder : [...sidebarOrder, id];
    onChange({
      views,
      favouriteIds: { ...favouriteIdsByRole, [activeRole]: nextFavouriteIds },
      sidebarOrder: { ...sidebarOrderByRole, [activeRole]: nextOrder },
      teamFavouriteIds,
    });
  };

  // Admin-only: move a view between "All Views" and "Team Favourites".
  // Capped at MAX_FAVOURITES too — same limit as personal favourites. A
  // Team Favourite is shared across every role, so it's added to (or
  // removed from) both roles' sidebarOrder at once.
  const toggleTeamFavourite = (id) => {
    const isTeamFavourited = teamFavouriteIds.includes(id);
    if (!isTeamFavourited && teamFavouriteIds.length >= MAX_FAVOURITES) return;
    const nextTeamFavouriteIds = isTeamFavourited
      ? teamFavouriteIds.filter((favId) => favId !== id)
      : [...teamFavouriteIds, id];
    const nextSidebarOrder = { ...sidebarOrderByRole };
    ['Admin', 'Agent'].forEach((role) => {
      const roleOrder = sidebarOrderByRole[role] || favouriteIdsByRole[role] || [];
      nextSidebarOrder[role] = isTeamFavourited
        ? roleOrder.filter((favId) => favId !== id)
        : roleOrder.includes(id) ? roleOrder : [...roleOrder, id];
    });
    onChange({
      views,
      favouriteIds: favouriteIdsByRole,
      sidebarOrder: nextSidebarOrder,
      teamFavouriteIds: nextTeamFavouriteIds,
    });
    setMenuOpenFor(null);
  };

  // Live-reorders while dragging over another row (personal favourite or
  // Team Favourite, mixed freely) — dropping the dragged card before/after
  // the hovered row so the other rows slide out of the way as you move.
  const reorderOverRow = (draggedViewId, targetViewId, placeAfter) => {
    if (draggedViewId === targetViewId) return;
    const fromIndex = sidebarOrder.indexOf(draggedViewId);
    let toIndex = sidebarOrder.indexOf(targetViewId);
    if (fromIndex === -1 || toIndex === -1) return;
    if (placeAfter) toIndex += 1;
    if (fromIndex < toIndex) toIndex -= 1;
    if (fromIndex === toIndex) return;
    const next = [...sidebarOrder];
    next.splice(fromIndex, 1);
    next.splice(toIndex, 0, draggedViewId);
    onChange({
      views,
      favouriteIds: favouriteIdsByRole,
      sidebarOrder: { ...sidebarOrderByRole, [activeRole]: next },
      teamFavouriteIds,
    });
  };

  const query = search.toLowerCase();
  // One merged, drag-reorderable list — personal favourites and Team
  // Favourites interleaved freely in whatever order the user's arranged
  // them. Its first 5 entries are what shows in the home nav.
  const mergedFavourites = sidebarOrder
    .map((id) => viewsById[id])
    .filter((v) => v && v.name.toLowerCase().includes(query));
  const others = views.filter(
    (v) => !favouriteIds.includes(v.id) && !teamFavouriteIds.includes(v.id) && v.name.toLowerCase().includes(query)
  );

  const isSelected = (view) =>
    activeFilter?.inbox === inboxName && activeFilter?.type === view.name;

  const canDrag = search.trim() === '';

  // A view that's a Team Favourite swaps its row icon to the users-plus
  // glyph too, on top of the separate circle-heart indicator next to the
  // star/kebab.
  const rowIcon = (view) =>
    teamFavouriteIds.includes(view.id) ? <TeamFavRowIcon /> : <ViewTypeIcon icon={view.icon} />;

  const starTooltip = (view) => {
    if (favouriteIds.includes(view.id)) return 'Remove from favorites';
    if (favouriteIds.length >= MAX_FAVOURITES) return 'You can add up to 5 favorites';
    return 'Add to favorites';
  };

  const renderRow = (view, { draggable = false } = {}) => (
    <div
      className={`view-row ${isSelected(view) ? 'selected' : ''} ${draggable ? 'draggable-row' : ''} ${draggedId === view.id ? 'is-dragging' : ''}`}
      key={view.id}
      ref={draggable ? (el) => { rowRefs.current[view.id] = el; } : undefined}
      onClick={() => onFilterChange?.({ inbox: inboxName, type: view.name })}
      onDragOver={(e) => {
        if (!draggable || !canDrag || !draggedId || draggedId === view.id) return;
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const placeAfter = e.clientY > rect.top + rect.height / 2;
        reorderOverRow(draggedId, view.id, placeAfter);
      }}
      onDrop={(e) => {
        if (!draggable) return;
        e.preventDefault();
        setDraggedId(null);
      }}
    >
      <div className="view-row-main">
        <span className="view-row-icon">
          {draggable ? (
            <>
              <span className="icon-default">{rowIcon(view)}</span>
              <span
                className="icon-drag-handle"
                draggable={canDrag}
                onDragStart={(e) => {
                  if (!canDrag) return;
                  e.stopPropagation();
                  // Suppress the native ghost preview entirely — reordering
                  // is shown purely by the rows sliding into place.
                  e.dataTransfer.setDragImage(EMPTY_DRAG_IMAGE, 0, 0);
                  setDraggedId(view.id);
                }}
                onDragEnd={() => setDraggedId(null)}
              >
                <DragHandleIcon />
              </span>
            </>
          ) : (
            rowIcon(view)
          )}
        </span>
        <span className="view-row-name">{view.name}</span>
      </div>
      <div className="view-row-meta">
        {teamFavouriteIds.includes(view.id) ? (
          // Team Favourites are pinned by the Admin and can't be personally
          // starred/unstarred by an Agent, so no star toggle here at all —
          // just the indicator marking it as team-pinned.
          <span
            className={`view-team-fav-indicator ${activeRole === 'Agent' ? 'agent-variant' : ''}`}
            aria-label="Team favourite"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setStarTooltipPosition({ top: rect.top - 6, left: rect.left + rect.width / 2 });
              setStarTooltipFor(view.id);
            }}
            onMouseLeave={() => setStarTooltipFor(null)}
          >
            <HeartCircleIcon />
            {starTooltipFor === view.id &&
              createPortal(
                <span
                  className={`view-star-tooltip ${activeRole === 'Agent' ? 'view-star-tooltip-multiline' : ''}`}
                  style={{ top: starTooltipPosition.top, left: starTooltipPosition.left }}
                >
                  {activeRole === 'Agent' ? (
                    <>
                      <span>View marked as team favorite</span>
                      <span>by your admin</span>
                    </>
                  ) : (
                    'Marked as team favorite'
                  )}
                </span>,
                document.body
              )}
          </span>
        ) : (
          <span
            className="view-star-wrap"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setStarTooltipPosition({ top: rect.top - 6, left: rect.left + rect.width / 2 });
              setStarTooltipFor(view.id);
            }}
            onMouseLeave={() => setStarTooltipFor(null)}
          >
            <button
              type="button"
              className="view-star-btn"
              disabled={!favouriteIds.includes(view.id) && favouriteIds.length >= MAX_FAVOURITES}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite(view.id);
              }}
              aria-label={favouriteIds.includes(view.id) ? 'Remove from favourites' : 'Add to favourites'}
            >
              <StarIcon filled={favouriteIds.includes(view.id)} />
            </button>
            {starTooltipFor === view.id &&
              createPortal(
                <span
                  className="view-star-tooltip"
                  style={{ top: starTooltipPosition.top, left: starTooltipPosition.left }}
                >
                  {starTooltip(view)}
                </span>,
                document.body
              )}
          </span>
        )}
        {(view.type === 'custom'
          ? activeRole === 'Admin' || !teamFavouriteIds.includes(view.id)
          // Predefined (system) views have nothing an Agent can do from
          // here — only Admin gets the kebab, and only to pin/unpin it as
          // a Team Favourite. No Rename/Edit/Delete for these.
          : activeRole === 'Admin'
        ) ? (
          <div className="view-kebab-wrap">
            <span className="view-row-count-under">{view.count}</span>
            <button
              type="button"
              className={`view-kebab-btn ${menuOpenFor === view.id ? 'menu-open' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (menuOpenFor === view.id) {
                  setMenuOpenFor(null);
                  return;
                }
                const rect = e.currentTarget.getBoundingClientRect();
                setMenuPosition({ top: rect.top - 6, left: rect.right + 6 });
                setMenuOpenFor(view.id);
              }}
              aria-label="View options"
            >
              <span className="view-kebab-btn-inner"><KebabIcon /></span>
            </button>
            {menuOpenFor === view.id &&
              createPortal(
                <div
                  className="view-kebab-menu"
                  style={{ top: menuPosition.top, left: menuPosition.left }}
                  ref={menuRef}
                  onClick={(e) => e.stopPropagation()}
                >
                  {activeRole === 'Admin' && (() => {
                    const isTeamFavourited = teamFavouriteIds.includes(view.id);
                    const isTeamCapped = !isTeamFavourited && teamFavouriteIds.length >= MAX_FAVOURITES;
                    return (
                      <>
                        <button
                          type="button"
                          className={`view-kebab-menu-item view-kebab-menu-item-subtitled ${isTeamCapped ? 'view-kebab-menu-item-disabled' : ''}`}
                          disabled={isTeamCapped}
                          onClick={() => toggleTeamFavourite(view.id)}
                        >
                          <UsersStarIcon />
                          <span className="view-kebab-menu-item-text">
                            <span className="view-kebab-menu-item-label">
                              {isTeamFavourited ? 'Remove from team favourites' : 'Add to team favourites'}
                            </span>
                            <span className={`view-kebab-menu-item-subtitle ${isTeamCapped ? 'view-kebab-menu-item-subtitle-warning' : ''}`}>
                              {isTeamCapped
                                ? 'You can add up to 5 team favourites'
                                : isTeamFavourited
                                ? 'Remove this view from your agents’ sidebar'
                                : 'Add this view to your agents’ sidebar'}
                            </span>
                          </span>
                        </button>
                        {view.type === 'custom' && <div className="view-kebab-menu-divider" />}
                      </>
                    );
                  })()}
                  {view.type === 'custom' && (
                    <>
                      <button type="button" className="view-kebab-menu-item" onClick={() => setMenuOpenFor(null)}>
                        <RenameIcon />
                        <span>Rename View</span>
                      </button>
                      <button type="button" className="view-kebab-menu-item" onClick={() => setMenuOpenFor(null)}>
                        <PencilIcon />
                        <span>Edit View</span>
                      </button>
                      <button type="button" className="view-kebab-menu-item" onClick={() => setMenuOpenFor(null)}>
                        <TrashIcon />
                        <span>Delete View</span>
                      </button>
                    </>
                  )}
                </div>,
                document.body
              )}
          </div>
        ) : (
          <span className="view-row-count">{view.count}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="all-views-panel">
      <div className="panel-header-top">
        <div className="header-row">
          <button type="button" className="back-btn" onClick={onBack}>
            <BackIcon />
            <span>Conversations</span>
          </button>
        </div>
        <div className="all-views-breadcrumb">{inboxName} / <strong>All Views</strong></div>
      </div>

      <div className="sidebar-content all-views-content">
        <div className="search-container">
          <div className="search-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="Find Views"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="section-title margin-top">My Favorites</div>
        <div className="nav-group view-list">
          {mergedFavourites.length > 0 ? (
            mergedFavourites.map((view) => renderRow(view, { draggable: true }))
          ) : (
            <div className="view-list-empty">There are no favourite views.</div>
          )}
        </div>

        <div className="view-list-divider" />

        <div className="section-title margin-top">All Views</div>
        <div className="nav-group view-list">
          {others.map((view) => renderRow(view))}
        </div>
      </div>
    </div>
  );
};

export default AllViewsPanel;
