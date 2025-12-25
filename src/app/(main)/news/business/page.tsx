import dbConnect from '@/lib/mongodb';
import Business from '@/models/Business';

interface PageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    searchType?: string;
  }>;
}

export default async function BusinessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedCategory = params.category || '전체';
  const searchQuery = params.search || '';
  const searchType = params.searchType || '업체명';

  await dbConnect();

  // Build search filter
  const filter: Record<string, unknown> = {};

  if (selectedCategory !== '전체') {
    filter.category = selectedCategory;
  }

  if (searchQuery) {
    if (searchType === '업체명') {
      filter.businessName = { $regex: searchQuery, $options: 'i' };
    } else if (searchType === '이름') {
      filter.ownerName = { $regex: searchQuery, $options: 'i' };
    }
  }

  // Fetch all businesses
  const businesses = await Business.find(filter).sort({ category: 1, businessName: 1 }).lean();

  // Group by category
  const businessesByCategory = {
    음식업: businesses.filter((b) => b.category === '음식업'),
    개인사업: businesses.filter((b) => b.category === '개인사업'),
    공의사업: businesses.filter((b) => b.category === '공의사업'),
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b">
        <a
          href="/news/business?category=전체"
          className={`px-4 py-2 ${
            selectedCategory === '전체'
              ? 'border-b-2 border-gray-700 font-semibold'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          전체
        </a>
        <a
          href="/news/business?category=음식업"
          className={`px-4 py-2 ${
            selectedCategory === '음식업'
              ? 'border-b-2 border-gray-700 font-semibold'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          음식업
        </a>
        <a
          href="/news/business?category=개인사업"
          className={`px-4 py-2 ${
            selectedCategory === '개인사업'
              ? 'border-b-2 border-gray-700 font-semibold'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          개인사업
        </a>
        <a
          href="/news/business?category=공의사업"
          className={`px-4 py-2 ${
            selectedCategory === '공의사업'
              ? 'border-b-2 border-gray-700 font-semibold'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          공의사업
        </a>
      </div>

      {/* Search bar */}
      <div className="mb-8 flex gap-2">
        <form className="flex gap-2" action="/news/business" method="get">
          {selectedCategory !== '전체' && (
            <input type="hidden" name="category" value={selectedCategory} />
          )}
          <select
            name="searchType"
            defaultValue={searchType}
            className="rounded border border-gray-300 px-4 py-2"
          >
            <option value="업체명">업체명</option>
            <option value="이름">이름</option>
          </select>
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="검색어를 입력하세요"
            className="flex-1 rounded border border-gray-300 px-4 py-2"
          />
          <button
            type="submit"
            className="rounded bg-gray-700 px-6 py-2 text-white hover:bg-gray-800"
          >
            검색
          </button>
        </form>
      </div>

      {/* Business listings */}
      {selectedCategory === '전체' ? (
        <>
          {/* Show all categories */}
          {Object.entries(businessesByCategory).map(([category, categoryBusinesses]) => (
            <div key={category} className="mb-12">
              <h2 className="mb-6 text-xl font-bold text-gray-800">■ {category}</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryBusinesses.map((business) => (
                  <div
                    key={business._id.toString()}
                    className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                  >
                    {/* Image */}
                    {business.image && (
                      <div className="h-48 overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={business.image}
                          alt={business.businessName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="mb-3 text-lg font-bold text-gray-800">
                        {business.businessName}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          - 이름<span className="ml-8">{business.ownerName} {business.ownerTitle}</span>
                        </p>
                        {business.phoneNumber && (
                          <p>
                            - 휴대전화<span className="ml-4">{business.phoneNumber}</span>
                          </p>
                        )}
                        {business.landlineNumber && (
                          <p>
                            - 전화번호<span className="ml-4">{business.landlineNumber}</span>
                          </p>
                        )}
                        {business.address && (
                          <p>
                            - 주소<span className="ml-8">{business.address}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {/* Show selected category */}
          <h2 className="mb-6 text-xl font-bold text-gray-800">■ {selectedCategory}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business) => (
              <div
                key={business._id.toString()}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                {/* Image */}
                {business.image && (
                  <div className="h-48 overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={business.image}
                      alt={business.businessName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="p-4">
                  <h3 className="mb-3 text-lg font-bold text-gray-800">
                    {business.businessName}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      - 이름<span className="ml-8">{business.ownerName} {business.ownerTitle}</span>
                    </p>
                    {business.phoneNumber && (
                      <p>
                        - 휴대전화<span className="ml-4">{business.phoneNumber}</span>
                      </p>
                    )}
                    {business.landlineNumber && (
                      <p>
                        - 전화번호<span className="ml-4">{business.landlineNumber}</span>
                      </p>
                    )}
                    {business.address && (
                      <p>
                        - 주소<span className="ml-8">{business.address}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {businesses.length === 0 && (
            <div className="py-20 text-center text-gray-500">
              등록된 사업체가 없습니다.
            </div>
          )}
        </>
      )}
    </div>
  );
}
