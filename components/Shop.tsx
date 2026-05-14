"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import { useSearchParams } from "next/navigation";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { client } from "@/sanity/lib/client";
import { Loader2, FilterX, ShoppingBag, TrendingUp, Sparkles, ChevronDown } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("name-asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }

      let sortOrder = "";
      if (sortBy === "price-asc") sortOrder = "| order(price asc)";
      else if (sortBy === "price-desc") sortOrder = "| order(price desc)";
      else if (sortBy === "name-asc") sortOrder = "| order(name asc)";
      else if (sortBy === "name-desc") sortOrder = "| order(name desc)";
      else if (sortBy === "newest") sortOrder = "| order(_createdAt desc)";

      const query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && price >= $minPrice && price <= $maxPrice
      ] 
      ${sortOrder} {
        ...,"categories": categories[]->title
      }
    `;
      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand, minPrice, maxPrice },
        { next: { revalidate: 0 } }
      );
      setProducts(data);
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice, sortBy]);

  const hasActiveFilters = selectedCategory !== null || selectedBrand !== null || selectedPrice !== null;

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedPrice(null);
    setSortBy("name-asc");
  };

  const activeFiltersCount = [
    selectedCategory ? 1 : 0,
    selectedBrand ? 1 : 0,
    selectedPrice ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <Container className="py-6 md:py-8 lg:py-12">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-4">
            <ShoppingBag className="w-2 h-2 text-amber-600" />
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Premium Collection
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Shop Luxury Collection
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Discover our curated selection of premium products designed for the discerning customer
          </p>
        </div>

        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-100 mb-6 transition-all duration-300">
          <div className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center justify-between lg:justify-start gap-4">
                <div>
                  <Title className="text-lg md:text-xl font-bold text-gray-900">
                    Curated for You
                  </Title>
                  <p className="text-sm text-gray-500 mt-1">
                    {products.length} {products.length === 1 ? "product" : "products"} available
                  </p>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
                >
                  <FilterX className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-500">Active filters:</span>
                    {selectedCategory && (
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full flex items-center gap-1">
                        {selectedCategory}
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="hover:text-amber-900"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedBrand && (
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full flex items-center gap-1">
                        {selectedBrand}
                        <button
                          onClick={() => setSelectedBrand(null)}
                          className="hover:text-amber-900"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedPrice && (
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full flex items-center gap-1">
                        ${selectedPrice}
                        <button
                          onClick={() => setSelectedPrice(null)}
                          className="hover:text-amber-900"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                )}

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 cursor-pointer hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-full">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-white shadow-sm text-amber-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-white shadow-sm text-amber-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`
              lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-120px)] lg:overflow-y-auto
              fixed inset-0 z-30 lg:relative lg:z-auto lg:block
              bg-white lg:bg-transparent transform transition-transform duration-300
              ${isFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
              lg:w-72 w-80
            `}
          >
            <div className="lg:static absolute inset-0 bg-white lg:bg-transparent">
              <div className="h-full overflow-y-auto p-6 lg:p-0 lg:pr-4 scrollbar-hide">
                {/* Mobile Close Button */}
                <div className="flex justify-between items-center mb-6 lg:hidden">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FilterX className="w-5 h-5" />
                  </button>
                </div>

                {/* Reset Filters Button (Mobile) */}
                {hasActiveFilters && (
                  <div className="lg:hidden mb-4">
                    <button
                      onClick={resetFilters}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200"
                    >
                      <Sparkles className="w-4 h-4" />
                      Reset All Filters
                    </button>
                  </div>
                )}

                {/* Filter Sections */}
                <div className="space-y-8">
                  <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                  <BrandList
                    brands={brands}
                    setSelectedBrand={setSelectedBrand}
                    selectedBrand={selectedBrand}
                  />
                  <PriceList
                    setSelectedPrice={setSelectedPrice}
                    selectedPrice={selectedPrice}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-200 rounded-full animate-spin border-t-amber-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-amber-600 animate-pulse" />
                    </div>
                  </div>
                  <p className="mt-4 font-medium text-gray-600">Curating the finest products...</p>
                  <p className="text-sm text-gray-400 mt-1">Please wait while we prepare your selection</p>
                </div>
              ) : products?.length > 0 ? (
                <>
                  <div className={`grid gap-4 ${
                    viewMode === "grid" 
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}>
                    {products?.map((product) => (
                      <ProductCard 
                        key={product?._id} 
                        product={product}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                  
                  {/* Load More / Pagination (Optional) */}
                  {products.length >= 20 && (
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                      <button className="px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full font-medium hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300">
                        Load More Products
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <NoProductAvailable 
                  className="bg-white mt-0 py-12"
                  message="No products match your criteria"
                  suggestion="Try adjusting your filters or browse our other categories"
                />
              )}
            </div>
          </main>
        </div>
      </Container>

      {/* Overlay for mobile filter */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default Shop;