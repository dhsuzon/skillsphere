

import { getCourses } from "@/utilit/getCoureses";
import { curriculum } from "@/data/curiculam";

import Image from "next/image";
import {
  FaPlayCircle,
  FaCheckCircle,
  FaClock,
  FaSignal,
  FaStar,
  FaUserTie,
} from "react-icons/fa";

const CourseDetailsPage = async ({ params }) => {
  const { id } = await params;
  const allCourses = await getCourses();
  const course = allCourses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <div className="text-center py-20">Course not found!</div>;
  }
  
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-75 md:h-120 w-full bg-slate-900">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            {course.category}
          </span>
          <h1 className="text-3xl md:text-6xl font-black text-white max-w-4xl leading-tight">
            {course.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-20 relative z-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Course Description
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {course.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-10 border-t border-gray-100">
              <div className="text-center">
                <FaClock className="mx-auto text-orange-500 mb-2" size={20} />
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Duration
                </p>
                <p className="font-bold text-gray-800">{course.duration}</p>
              </div>
              <div className="text-center">
                <FaSignal className="mx-auto text-orange-500 mb-2" size={20} />
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Level
                </p>
                <p className="font-bold text-gray-800">{course.level}</p>
              </div>
              <div className="text-center">
                <FaStar className="mx-auto text-orange-500 mb-2" size={20} />
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Rating
                </p>
                <p className="font-bold text-gray-800">{course.rating}</p>
              </div>
              <div className="text-center">
                <FaUserTie className="mx-auto text-orange-500 mb-2" size={20} />
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Instructor
                </p>
                <p className="font-bold text-gray-800 truncate">
                  {course.instructor}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 ml-4">
              What you learn
            </h2>
            <div className="grid gap-4">
              {curriculum.map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 font-bold text-lg">
                    {lesson}
                  </span>
                  <FaCheckCircle className="ml-auto text-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-orange-50 sticky top-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Enrollment
            </h3>
            <p className="text-gray-500 mb-8 text-sm">
              Start your journey today and get lifetime access.
            </p>

            <div className="flex items-baseline gap-2 mb-10">
              <span className="text-5xl font-black text-orange-600">
                $49.00
              </span>
              <span className="text-gray-400 line-through font-bold text-xl">
                $95.00
              </span>
            </div>

            <button className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3">
              <FaPlayCircle /> Start Learning
            </button>

            <p className="text-center mt-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Secured by SkillSphere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
