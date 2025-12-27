/**
 * 게시판 권한 관리
 */

export const BOARD_PERMISSIONS = {
  POSTS: 'posts',
  SERMONS: 'sermons',
  COLUMNS: 'columns',
  ALBUMS: 'albums',
  CHURCH_ALBUMS: 'church-albums',
  EVENTS: 'events',
  BUSINESSES: 'businesses',
  CHURCH_NEWS: 'church-news',
  FAITH_INFO: 'faith-info',
  NEWCOMERS: 'newcomers',
  ALBUM_EXTRA1: 'album-extra1',
  ALBUM_EXTRA2: 'album-extra2',
  BOARD_EXTRA1: 'board-extra1',
  BOARD_EXTRA2: 'board-extra2',
} as const;

export type BoardPermission = typeof BOARD_PERMISSIONS[keyof typeof BOARD_PERMISSIONS];

export const BOARD_PERMISSION_LABELS: Record<BoardPermission, string> = {
  [BOARD_PERMISSIONS.POSTS]: '주보모음',
  [BOARD_PERMISSIONS.SERMONS]: '주일설교 영상',
  [BOARD_PERMISSIONS.COLUMNS]: '담임목사님 칼럼',
  [BOARD_PERMISSIONS.ALBUMS]: '교회학교 앨범',
  [BOARD_PERMISSIONS.CHURCH_ALBUMS]: '교회앨범',
  [BOARD_PERMISSIONS.EVENTS]: '교회 일정',
  [BOARD_PERMISSIONS.BUSINESSES]: '교우사업터',
  [BOARD_PERMISSIONS.CHURCH_NEWS]: '교회 소식',
  [BOARD_PERMISSIONS.FAITH_INFO]: '신앙정보 공유 터',
  [BOARD_PERMISSIONS.NEWCOMERS]: '새신자 소개',
  [BOARD_PERMISSIONS.ALBUM_EXTRA1]: '앨범 게시판 1',
  [BOARD_PERMISSIONS.ALBUM_EXTRA2]: '앨범 게시판 2',
  [BOARD_PERMISSIONS.BOARD_EXTRA1]: '게시판 1',
  [BOARD_PERMISSIONS.BOARD_EXTRA2]: '게시판 2',
};

/**
 * 사용자가 특정 게시판에 접근 권한이 있는지 확인
 */
export function hasPermission(
  userRole: 'admin' | 'user' | undefined,
  userPermissions: string[] | undefined,
  requiredPermission: BoardPermission
): boolean {
  // admin은 모든 권한 보유
  if (userRole === 'admin') {
    return true;
  }

  // user는 permissions 배열 확인
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }

  return userPermissions.includes(requiredPermission);
}
