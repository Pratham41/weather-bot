import React, { useEffect, useState } from "react";
import FormLayout from "../components/FormLayout";
import axios from "axios";

const Settings = () => {
  const [botData, setBotData] = useState(null);

  const handleUpdate = async (e, botSettings) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`http://localhost:5000/bot`, { botSettings }, config);
    setBotData(null);
  };

  useEffect(() => {
    if (!botData) {
      axios.get("http://localhost:5000/bot").then((res) => {
        setBotData(res.data);
      });
    }
  }, [botData]);
  return (
    <>
      <h1 className="text-gray-500 font-semibold text-xl mb-2">
        Bot Setttings
      </h1>

      <FormLayout>
        {botData && (
          <form
            onSubmit={(e) => handleUpdate(e, botData)}
            className="p-10 rounded-xl border border-gray-300 mt-10"
          >
            <div className="flex flex-col justify-between items-start my-2">
              <label className="mb-2 text-purple-800">Bot Token</label>
              <input
                className="p-2 outline-none rounded-lg text-gray-500 text-lg"
                type="password"
                value={botData.botToken}
                onChange={(e) =>
                  setBotData({ ...botData, botToken: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col justify-between items-start">
              <label className="mb-2 text-purple-800">Weather key</label>
              <input
                className="p-2 outline-none rounded-lg text-gray-500 text-lg"
                type="password"
                value={botData.weatherApiKey}
                onChange={(e) =>
                  setBotData({ ...botData, weatherApiKey: e.target.value })
                }
              />
            </div>
            <div className="mt-2 flex flex-row justify-between">
              <button
                type="submit"
                className="bg-green-400 py-2 px-2.5 mt-2 font-semibold rounded-xl text-green-700"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </FormLayout>
    </>
  );
};

export default Settings;
