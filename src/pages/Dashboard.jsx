import { useEffect, useState } from "react";
import api from "../api/api";
import { useUserStore } from "../store/userStore";
import TaskList from "../components/TaskList";
import { Target, TrendingUp, CheckCircle, Calendar } from "lucide-react";


const STAGE_CONFIG = {
  1: {
    label: "Profile Ready",
    nextAction: "Explore universities with AI counsellor",
    progress: 20
  },
  2: {
    label: "University Shortlisting",
    nextAction: "Shortlist and evaluate universities",
    progress: 40
  },
  3: {
    label: "University Locked",
    nextAction: "Prepare applications for locked university",
    progress: 70
  },
  4: {
    label: "Application Submitted",
    nextAction: "Track decisions and next steps",
    progress: 90
  },
  5: {
    label: "Completed",
    nextAction: "Study abroad journey completed",
    progress: 100
  }
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const setStage = useUserStore((s) => s.setStage);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data);
      setStage(res.data.stage);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) return null;

  const stageMeta = STAGE_CONFIG[data.stage] || STAGE_CONFIG[1];

  const getStageColor = (stage) => {
    const colors = {
      1: "from-blue-500 to-blue-600",
      2: "from-purple-500 to-purple-600",
      3: "from-green-500 to-green-600",
      4: "from-yellow-500 to-yellow-600",
      5: "from-pink-500 to-pink-600"
    };
    return colors[stage] || "from-gray-500 to-gray-600";
  };

  const completedTasks = data.tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Study Abroad Dashboard
            </h1>
            <p className="text-gray-600">
              Track your progress and next steps
            </p>
          </div>

          <div className="hidden md:block">
            <div
              className={`px-6 py-3 bg-gradient-to-r ${getStageColor(
                data.stage
              )} text-white font-bold rounded-xl text-lg`}
            >
              Stage {data.stage}: {stageMeta.label}
            </div>
          </div>
        </div>
      </div>

      {/* ================= PROGRESS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* -------- Current Stage -------- */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <Target className="w-8 h-8 text-blue-500 mr-3" />
            <h3 className="font-bold text-lg">Current Stage</h3>
          </div>

          <p className="text-gray-700 mb-4">
            {stageMeta.nextAction}
          </p>

          {/* Progress Bar */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Progress
              </span>
              <span className="text-xs font-semibold inline-block text-blue-600">
                {stageMeta.progress}%
              </span>
            </div>

            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
              <div
                style={{ width: `${stageMeta.progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
          </div>
        </div>

        {/* -------- Completion Rate -------- */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
            <h3 className="font-bold text-lg">Completion Rate</h3>
          </div>

          <div className="text-4xl font-bold text-gray-900 mb-2">
            {completedTasks}/{data.tasks.length}
          </div>

          <p className="text-gray-600">Tasks completed</p>
        </div>

        {/* -------- Timeline -------- */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <Calendar className="w-8 h-8 text-purple-500 mr-3" />
            <h3 className="font-bold text-lg">Timeline</h3>
          </div>

          <p className="text-gray-700">
            Estimated completion:{" "}
            <span className="font-semibold text-purple-600">
              {data.stage <= 2 ? "2–3 months" : "1–2 months"}
            </span>
          </p>
        </div>
      </div>

      {/* ================= TASKS ================= */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Your Tasks</h2>
          </div>
          <p className="text-gray-600 mt-1">
            Complete these tasks to support your current stage
          </p>
        </div>

        <div className="p-6">
          <TaskList tasks={data.tasks} refresh={loadDashboard} />
        </div>
      </div>
    </div>
  );
}
