import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";

import { fetchCars } from "@/utils";

export default async function Home({ searchParams }) {

  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
  console.log(allCars)

  const isDataEmpty = !Array.isArray(allCars) ||
    allCars.length < 0 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width"
        id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extralight">
            Car Catalogue
          </h1>
          <p>
            Explore the cars you might like
          </p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">

            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />

          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />

          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl
              font-bold">
              Oops no results!
            </h2>
            <p>{allCars.message}</p>
          </div>
        )}

      </div>
    </main>
  );
}
