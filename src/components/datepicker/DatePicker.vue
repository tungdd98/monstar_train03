<template>
    <div class="border p-2 m-2 shadow" style="max-width: 400px; width: 100%">
        <h1 class="display-4 text-center mb-4" style="font-size: 20px">
            DatePicker
        </h1>
        <div class="d-flex justify-content-between mx-1">
            <button
                class="btn btn-outline-info btn-sm"
                @click="onChangeMonth(-1)"
            >
                Prev
            </button>
            <div class="d-flex">
                <select
                    class="w-select form-control form-control-sm mx-1"
                    style="width: 80px"
                    v-model="info.year"
                >
                    <option :value="n + 2010" v-for="n in 20" :key="n">{{
                        (n += 2010)
                    }}</option>
                </select>
                <select
                    class="w-select form-control form-control-sm mx-1"
                    style="width: 80px"
                    v-model="info.month"
                >
                    <option :value="n" v-for="n in 12" :key="n">{{ n }}</option>
                </select>
            </div>
            <button
                class="btn btn-outline-info btn-sm"
                @click="onChangeMonth(1)"
            >
                Next
            </button>
        </div>
        <div class="d-flex justify-content-between text-center">
            <div class="w-square mx-1" v-for="item in titleColumns" :key="item">
                {{ item }}
            </div>
        </div>
        <div
            class="d-flex justify-content-between"
            v-for="(row, idxRow) in calendar"
            :key="idxRow"
        >
            <date-picker-square
                v-for="(col, idxCol) in row"
                :key="idxCol"
                :data="col"
                @on-change-current-date="onChangeCurrentDate"
            ></date-picker-square>
        </div>
    </div>
</template>

<script>
import DatePickerSquare from "./DatePickerSquare";
export default {
    components: {
        DatePickerSquare
    },
    data() {
        return {
            titleColumns: ["Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat"],
            dateCount: 0,
            rowCount: 6,
            columnCount: 7,
            info: {
                year: null,
                month: null,
                date: null,
                day: null
            },
            calendar: null
        };
    },
    computed: {
        startDay() {
            return new Date(this.info.year, this.info.month - 1, 1).getDay();
        }
    },
    watch: {
        "info.month"(val) {
            this.init(val);
        },
        "info.year"(val) {
            this.init(this.info.month);
        }
    },
    created() {
        const now = new Date();
        this.info = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            date: now.getDate(),
            day: now.getDay() + 1
        };
        this.init(this.info.month);
    },
    methods: {
        init(month) {
            this.getDateCount(month);
            this.setCalendar();
        },
        getDateCount(month) {
            switch (month) {
                case 2:
                    this.dateCount = this.info.year % 4 === 0 ? 29 : 28;
                    break;
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    this.dateCount = 31;
                    break;
                default:
                    this.dateCount = 30;
                    break;
            }
        },
        setCalendar() {
            this.setEmptyCalendar();
            let count = 0;
            for (let i = this.startDay; i < this.columnCount; i++) {
                count++;
                this.setInfoSquare(0, i, count);
            }
            for (let row = 1; row < this.rowCount; row++) {
                for (let col = 0; col < this.columnCount; col++) {
                    count++;
                    this.setInfoSquare(row, col, count);
                    if (count === this.dateCount) return;
                }
            }
        },
        setInfoSquare(row, column, value) {
            this.calendar[row][column] = {
                value,
                row,
                column
            };
        },
        setEmptyCalendar() {
            this.calendar = Array(6)
                .fill(null)
                .map(item => Array(7).fill(null));
        },
        onChangeCurrentDate(data) {
            if (data) {
                this.info.date = data.value;
            }
        },
        onChangeMonth(number) {
            if (this.info.month === 12 && number === 1) {
                this.info.month = 1;
                this.info.year += 1;
            } else if (this.info.month === 1 && number === -1) {
                this.info.month = 12;
                this.info.year -= 1;
            } else {
                this.info.month += number;
            }
        }
    }
};
</script>

<style></style>
