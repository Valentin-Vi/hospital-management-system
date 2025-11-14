import { useState } from "react"
// import { Button, type BUTTON_VARIANTS } from "./button"
// import { FaSearch } from "react-icons/fa";
// import { LuLoaderPinwheel } from "react-icons/lu";

const SEARCH_FIELD_VARIANTS: { [key: string]: { className: React.HTMLAttributes<HTMLDivElement>['className'], buttonVariant: BUTTON_VARIANTS } } = {
  white_bordered: { className: 'bg-white border border-0.5 border-black', buttonVariant: 'gray'},
  black_bordered: { className: undefined, buttonVariant: 'gray'},
  skeleton: { className: 'bg-transparent text-gray-500 border border-0.5 border-gray-500 hover:bg-black hover:text-white hover:border-transparent transition duration-200 ease-in-out', buttonVariant: 'skeleton'}
} as const;
export type SEARCH_FIELD_VARIANTS = (keyof typeof SEARCH_FIELD_VARIANTS);

type SEARCH_FIELD_PROPS = {
  variant: SEARCH_FIELD_VARIANTS;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchFn: (searchValue: string) => void;
  coolDown?: number;
  className?: string;
}

export const SearchField = ({
  variant, searchFn, searchValue, setSearchValue, className
}: SEARCH_FIELD_PROPS) => {
  const [isCooledDown, setIsCooledDown] = useState<boolean>(false);

  const classNameValue = className ?? (
    'rounded-md min-w-24 min-h-4 max-w-96 max-h-8 px-2 focus:outline-0 ' +
    SEARCH_FIELD_VARIANTS[variant].className
  )

  const buttonVariant = SEARCH_FIELD_VARIANTS[variant].buttonVariant

  const handleSearch = () => {
    if(isCooledDown) return;
    setIsCooledDown(true)
    setTimeout(() => {
      setIsCooledDown(false)
    }, 1000)
    searchFn(searchValue)
  }

  const onKeyDownFunction = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='flex flex-row gap-2' >
      <input className={classNameValue} value={searchValue} placeholder='Search...' onKeyDown={onKeyDownFunction} onChange={e => setSearchValue(e.target.value)} type="text" />
      <div className="flex justify-center items-center w-6">
          { isCooledDown ?
            <LuLoaderPinwheel className="animate-spin text-gray-700"/>
            :
            <Button className='' variant={buttonVariant} shape="round" onClick={() => handleSearch()} disabled={isCooledDown ? true : false} displayText="Search" Icon={FaSearch} />
          }
      </div>
    </div>
  )
}
