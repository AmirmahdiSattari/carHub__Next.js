"use client"
import React, { useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { updateSearchParams } from '@/utils'

const CustomFilter = ({ title, options }) => {

  const [selected, setSelected] = useState(options[0])

  const router = useRouter();

  const handleUpdateParams = (e) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());
    router.push(newPathName);
  };
  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => { setSelected(e), handleUpdateParams(e) }}
      >
        <div className='relative w-fit z-10'>
          <ListboxButton className={`custom-filter__btn`}>
            <span className='block truncate'>
              {selected.title}
            </span>
            <Image
              src={'chevron-up-down.svg'}
              width={20} height={20}
              className='ml-4 object-contain'
              alt="chevron up down "
            />
          </ListboxButton>
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ListboxOptions className='custom-filter__options'>
              {/* Map over the options and display them as listbox options */}
              {options.map((option) => (
                <ListboxOption
                  key={option.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`} >
                        {option.title}
                      </span>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter